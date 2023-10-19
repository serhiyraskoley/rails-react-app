import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NavBar from './NavBar';

describe('NavBar component', () => {
  const renderNabBar = () => {
    render(<NavBar />, {wrapper: MemoryRouter});
  };
  
  test("render both links", () => {
    // render the navbar
    renderNabBar();
    //expect the links to be there 
    expect(screen.getByText("Posts List")).toBeInTheDocument();
    expect(screen.getByText("Create New Post")).toBeInTheDocument();
  });
});