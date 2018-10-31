import React, { Component } from "react";
import _debounce from '../../../utils/debounce';

function getDimensions(element) {
    return [element.clientWidth, element.clientHeight];
}

export default function Dimensions(debounce) {
    return (ComposedComponent) => {
        return class DimensionsHoc extends Component {
            state = {}

            componentDidMount() {
                if (!this.refs.wrapper) {
                    throw new Error('Cannot find wrapper div');
                }
                this._parent = this.refs.wrapper.parentNode;
                this.updateDimensionsImmediate();
                this.getWindow().addEventListener('resize', this.onResize, false);
            }

            componentWillUnmount() {
                this.getWindow().removeEventListener('resize', this.onResize);
            }

            onResize = () => {
                if (this.rqf) return;
                this.rqf = this.getWindow().requestAnimationFrame(() => {
                    this.rqf = null;
                    this.updateDimensions();
                });
            }

            getWindow() {
                return this.refs.container ? (this.refs.container.ownerDocument.defaultView || window) : window;
            }

            updateDimensionsImmediate = () => {
                const dimensions = getDimensions(this._parent);

                if (dimensions[0] !== this.state.containerWidth ||
                    dimensions[1] !== this.state.containerHeight) {
                    this.setState({
                        containerWidth: dimensions[0],
                        containerHeight: dimensions[1]
                    });
                }
            }

              // Optionally-debounced updateDimensions callback
              updateDimensions = debounce === 0 ? this.updateDimensionsImmediate
                  : _debounce(this.updateDimensionsImmediate, debounce)


              render() {
                  const {containerWidth, containerHeight} = this.state;
                  if (this._parent && !containerWidth && !containerHeight) {
                      // only trigger a warning about the wrapper div if we already have a reference to it
                      console.warn('Wrapper div has no height or width, try overriding style with `containerStyle` option');
                  }
                  const wrapperStyle = {
                      overflow: 'visible',
                      height: 0,
                      width: 0
                  };
                  return (
                      <div style={wrapperStyle} ref="wrapper">
                          {(containerWidth || containerHeight) &&
                          <ComposedComponent
                              {...this.state}
                              {...this.props}
                              updateDimensions={this.updateDimensions}
                              ref="wrappedInstance"
                          />
                          }
                      </div>
                  );
              }
        };
    };
}
