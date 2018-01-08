import React, {Component} from 'react';
import 'particles.js/particles';

const particlesJS = window.particlesJS;
export default class Login extends Component {

    componentDidMount() {
        this.loadParticle()
    }

    render() {
        return (
            <div>
                {/*--背景*/}
                <div id="Particles"></div>
            </div>

        )
    }

    // 加载 particles canvas 动画
    loadParticle() {
        particlesJS.load('Particles', 'particles.json', function () {
            console.log('callback - particles.js config loaded');
        });
    }

}
