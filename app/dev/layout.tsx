import VibeProgress from "../components/VibeProgress";
import HamburgerMenu from "../components/HamburgerMenu";
import BitcoinTicker from "../components/BitcoinTicker";
import LudicrousMode from "../components/LudicrousMode";

export const metadata = {
  title: "Vibe Drive - Dev Console",
  description: "The Future of Motion - Development Console",
};

export default function DevLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="pt-12">
      <BitcoinTicker />
      <HamburgerMenu />
      {children}
      <VibeProgress />
      <LudicrousMode />
    </div>
  );
}
