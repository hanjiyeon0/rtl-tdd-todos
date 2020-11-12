import React from "react";
import { render, fireEvent } from "@testing-library/react";
import TodoForm from "./TodoForm";

describe("<TodoFrom />", () => {
    const setup = (props = {}) => {
        const utils = render(<TodoForm {...props} />);
        const { getByText, getByPlaceholderText } = utils;
        const input = getByPlaceholderText("할 일을 입력하세요");
        const button = getByText("등록");
        return {
            ...utils,
            input,
            button,
        };
    };
    it("has input and a button", () => {
        const { input, button } = setup();
        expect(input).toBeTruthy(); //해당 값이 truthy
        expect(button).toBeTruthy();
    });

    it("changes input", () => {
        const { input } = setup();
        fireEvent.change(input, {
            target: {
                value: "TDD 배우기",
            },
        });
        expect(input).toHaveAttribute("value", "TDD 배우기");
    });
    it("calls onInsert and clears input", () => {
        const onInsert = jest.fn();
        /*여기서 사용한 jest.fn() 은 jest 에서 제공하는 mock 함수입니다. 
        이 함수를 사용하면 이 함수가 호출 된 다음 toBeCalled 또는 toBeCalledWith 같은 matcher 를 사용해서 함수가 호출됐는지, 
        호출 됐다면 어떤 파라미터로 호출 됐는지 이런 것들을 쉽게 확인 할 수 있습니다. */
        const { input, button } = setup({ onInsert }); //props가 필요할 땐 이렇게 직접 파라미터로 전달
        //수정하고
        fireEvent.change(input, {
            target: {
                value: "TDD 배우기",
            },
        });
        //버튼 클릭
        fireEvent.click(button);
        expect(onInsert).toBeCalledWith("TDD 배우기"); //onInsert가 "TDD 배우기" 파타미터가 호출됐어야함
        expect(input).toHaveAttribute("value", ""); //input이 비워져야함
    });
});
