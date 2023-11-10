import EyecatchImage from "@/../public/eyecatch.jpg";
import FullScreenWidth from "@/components/BaseLayout/FullScreenWidth";
import { Container } from "@mantine/core";
import Image from "next/image";
import BannerSection from "./BannerSection";
import MenuSection from "./MenuSection";

export default function Home() {
  return (
    <main>
      <FullScreenWidth>
        <BannerSection />
        <Container p="0">
          <Image
            src={EyecatchImage}
            alt="ズトカ Wiki杯"
            style={{ width: "100%", height: "auto" }}
          />
        </Container>
      </FullScreenWidth>
      <MenuSection />
    </main>
  )
}
