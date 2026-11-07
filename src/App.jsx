import Hero from "./components/Hero";
import Profile from "./components/Profile";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Courses from "./components/Courses";
import About from "./components/About";
import Footer from "./components/Footer";
import Faq from "./components/Faq";
import CourseContactCta from "./components/CourseContactCta";

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Hero />
      <main id="main-content">
        <Profile />
        <Projects />
        <Courses />
        <Experience />
        <About />
        <Faq />
        <CourseContactCta />
      </main>
      <Footer />
    </>
  );
}
