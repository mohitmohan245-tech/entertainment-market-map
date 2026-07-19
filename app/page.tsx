import MarketMap from "@/components/MarketMap";
import taxonomy from "@/data/taxonomy.json";
import type { Taxonomy } from "@/data/types";

export default function Home() {
  return <MarketMap taxonomy={taxonomy as Taxonomy} />;
  }
  
