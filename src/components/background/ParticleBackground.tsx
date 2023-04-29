import {useCallback} from "react";
import {loadFull} from "tsparticles";
import Particles from "react-tsparticles";
import particlesOptions from "./particles.json";
import type {Engine} from "tsparticles-engine";
import {ISourceOptions} from "tsparticles-engine";

export default function ParticleBackground() {
    const particlesInit = useCallback(async (engine: Engine) => {
        await loadFull(engine);
    }, []);

    return (
        <div className="App">
            <Particles options={particlesOptions as ISourceOptions} init={particlesInit}/>
        </div>
    );
};
