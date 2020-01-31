import React from 'react';
import ProfileStatus from "./ProfileStatus";
import {create} from "react-test-renderer"

describe("ProfileStatus component", () => {
    test("status in props should be in the state", () => {
        let component = create(<ProfileStatus status={"it-kamasutra"}/>);
        let instance = component.getInstance();
        let root = component.root;
        expect(instance.state.status).toBe("it-kamasutra");
    });

    test("span should be displayed after rendering", () => {
        let component = create(<ProfileStatus status={"it-kamasutra"}/>);
        let instance = component.getInstance();
        let root = component.root;
        let span = root.findByType("span");
        expect(span).not.toBeNull();
    });

    test("after creation input shouldn`t be displayed", () => {
        let component = create(<ProfileStatus status={"it-kamasutra"}/>);
        let instance = component.getInstance();
        let root = component.root;
        expect(() => {
            root.findByType("root");
        }).toThrow();
    });

    test("input should be displayed in edit mode instead of span", () => {
        let component = create(<ProfileStatus status={"it-kamasutra"}/>);
        let instance = component.getInstance();
        let root = component.root;
        let span = root.findByType("span");
        span.props.onDoubleClick();
        let input = root.findByType("input");
        expect(input).not.toBeNull();
    });
});