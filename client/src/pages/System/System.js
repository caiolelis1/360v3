import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const System = () => {
  const [system, setSystem] = useState({});
  const [subsystems, setSubsystems] = useState([]);

  const params = useParams();
  const id = params.id;

  const fetchSystem = () => {
    axios
      .post("http://localhost:8800/api/system/getSystem", {
        system: id,
      })
      .then((res) => {
        setSystem(res.data[0]);
      });
  };

  const fetchSubsystems = () => {
    axios
      .post("http://localhost:8800/api/subsystem/getSubsystemBySystem", {
        id: id,
      })
      .then((res) => {
        setSubsystems(res.data);
      });
  };

  useEffect(() => {
    fetchSystem();
    fetchSubsystems();
  }, []);

  return (
    <div>
      <div>
        <h1>{system?.nameSystem}</h1>
      </div>
      <div>
        <h2>Subsistemas</h2>
        {subsystems.map((subsystem) => (
          <p>
            <a href={"/subsistema/" + subsystem.idSubsystem}>
              {subsystem.nameSubsystem}
            </a>
          </p>
        ))}
      </div>
      <div>
        <h1 className="text-center">Notas</h1>
      </div>
    </div>
  );
};

export default System;
