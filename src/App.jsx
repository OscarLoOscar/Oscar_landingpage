import Hero from "./components/Hero";
import ScrollIntro from "./components/ScrollIntro";
import Profile from "./components/Profile";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Courses from "./components/Courses";
import About from "./components/About";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <ScrollIntro />
      <Hero />
      <main>
        <Profile />
        <Experience />
        <Projects />
        <Courses />
        <About />
      </main>
      <Footer />
    </>
  );
}
