import particlesOptions from "./particles.json";
import {useCallback} from "react";
import {loadFull} from "tsparticles";
import Particles from "react-tsparticles";
import type {Engine} from "tsparticles-engine";
import {ISourceOptions} from "tsparticles-engine";

export default function ParticleBackground() {
    const particlesInit = useCallback(async (engine: Engine) => {
        await loadFull(engine);
    }, []);

    return (
        <div>
            <Particles options={particlesOptions as ISourceOptions} init={particlesInit}/>
        </div>
    );
};
