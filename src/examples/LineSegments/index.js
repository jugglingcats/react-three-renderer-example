import React from 'react';
import React3 from 'react-three-renderer';
import THREE from 'three';

class LineSegments extends React.Component {
    static propTypes = {
        width: React.PropTypes.number.isRequired,
        height: React.PropTypes.number.isRequired,
    };

    constructor(props, context) {
        super(props, context);

        this.cameraPosition = new THREE.Vector3(0, 0, 5);

        // construct the position vector here, because if we use 'new' within render,
        // React will think that things have changed when they have not.

        this.state = {
            // cubeRotation: new THREE.Euler(),
            numLines: 10,
            vertices: this.calc_vertices(10),
            show: true
        };

        this._onAnimate = () => {
            // we will get this callback every frame

            // pretend cubeRotation is immutable.
            // this helps with updates and pure rendering.
            // React will be sure that the rotation has now updated.
            // this.setState({
            //   cubeRotation: new THREE.Euler(
            //     this.state.cubeRotation.x + 0.1,
            //     this.state.cubeRotation.y + 0.1,
            //     0
            //   ),
            // });
        };
    }

    calc_vertices(num) {
        const vertices = [];
        for (let n = 0; n < num; n++) {
            vertices.push(this.make_vertex(n));
        }
        return vertices;
    }

    make_vertex(n) {
        return new THREE.Vector3(n * 0.2, n % 2 * 4 - 2, 0);
    }

    update_lines(delta) {
        let newCount = this.state.numLines + delta;
        this.setState({
            numLines: newCount,
            vertices: this.calc_vertices(newCount)
        });

    }

    removeLine() {
        if (this.state.numLines < 3) {
            return;
        }
        this.update_lines(-1);
    }

    addLine() {
        this.update_lines(1);
    }

    showHide() {
        this.setState({
            show: !this.state.show
        });
    }

    render() {
        const {
            width,
            height,
        } = this.props;

        // or you can use:
        // width = window.innerWidth
        // height = window.innerHeight

        return (<div>
            <button onClick={this.removeLine.bind(this)}>Remove Line</button>
            <button onClick={this.addLine.bind(this)}>Add Line</button>
            <button onClick={this.showHide.bind(this)}>{this.state.show ? 'Hide' : 'Show'}</button>
            NUM LINES: {this.state.numLines}

            {this.state.show ?
                <React3
                    mainCamera="camera" // this points to the perspectiveCamera below
                    width={width}
                    height={height}
                >
                    <scene>
                        <perspectiveCamera
                            name="camera"
                            fov={75}
                            aspect={width / height}
                            near={0.1}
                            far={1000}

                            position={this.cameraPosition}
                        />
                        <line>
                            <geometry vertices={this.state.vertices}/>
                            <lineBasicMaterial color={0xc0c0ff}/>
                        </line>

                    </scene>
                </React3>
                :
                <div>Hidden!</div>}
        </div>);
    }
}

export default LineSegments;
