import React from "react";
import { render } from "@testing-library/react";
import { ButtonStyled, ButtonTable } from "../common/style/buttons"

describe("Button component", () => {
    test("Debe renderizar con el color verde cuando type es 'true'", () => {
        const { getByTestId } = render(<ButtonStyled type="true">Click me</ButtonStyled>);
        const button = getByTestId("ButtonStyled");

        expect(button).toHaveStyle("background-color: #5Ad07A");
    });

    test("Debe renderizar con el color rojo cuando type es 'false'", () => {
        const { getByTestId } = render(<ButtonStyled type="false">Click me</ButtonStyled>);
        const button = getByTestId("ButtonStyled");

        expect(button).toHaveStyle("background-color: #E23428");
    });
});


describe("ButtonTable component", () => {
    test("Debe renderizar con el color verde cuando status es 'Check In'", () => {
        const { getByTestId } = render(<ButtonTable status="Check In">Click me</ButtonTable>);
        const button = getByTestId("ButtonTable");

        expect(button).toHaveStyle("background-color: #5Ad07A");
    });

    test("Debe renderizar con el color rojo cuando status es 'Check Out'", () => {
        const { getByTestId } = render(<ButtonTable status="Check Out">Click me</ButtonTable>);
        const button = getByTestId("ButtonTable");

        expect(button).toHaveStyle("background-color: #E23428");
    });

    test("Debe renderizar con el color amarillo cuando status es 'In Progress'", () => {
        const { getByTestId } = render(<ButtonTable status="In Progress">Click me</ButtonTable>);
        const button = getByTestId("ButtonTable");

        expect(button).toHaveStyle("background-color: #F5C623");
    });

    test("Debe renderizar con el color gris cuando status es desconocido", () => {
        const { getByTestId } = render(<ButtonTable status="Unknown">Click me</ButtonTable>);
        const button = getByTestId("ButtonTable");

        expect(button).toHaveStyle("background-color: #D3D3D3");
    });
});