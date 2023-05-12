import "../__mocks__/matchMedia.mock";
import React from "react";
import { render } from "@testing-library/react";
import Slide from "./slide";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

describe("Slide", () => {
  it("renders slide with images", () => {
    const images = [
      { id: 1, image: "image1.jpg" },
      { id: 2, image: "image2.jpg" },
      { id: 3, image: "image3.jpg" },
    ];
    const { getAllByAltText } = render(<Slide images={images} />);
    const imageElements = getAllByAltText("image");
    expect(imageElements).toHaveLength(images.length);
  });
});
