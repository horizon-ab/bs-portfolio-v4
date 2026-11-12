import Image from "next/image";

import Rain from "@/components/Rain";
import Bubbles from "@/components/Bubbles";
import Hexagons, { type JSONContent }  from "@/components/Hexagons"; // TODO: delete later

import projectsData from "@/public/projects.json"

const projects: JSONContent = projectsData;

export default function Home() {
  return (
	  <>
		<Rain />
		<Bubbles />
		<Hexagons content={projects}/>
	  </>
	  
  );
}
