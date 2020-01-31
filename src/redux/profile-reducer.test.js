import profileReducer, {addPostActionCreator, deletePost} from "./profile-reducer";
import React from "react";

let state = {
    posts: [{id: 1, message: 'Hello, how are you?', likesCount: 15},
        {id: 2, message: 'I am the dangerous, Skyler.', likesCount: 20},
        {id: 3, message: 'And if you save yourself...', likesCount: 11}
    ]
};

it("length of posts should be incremented ", () => {
    let action = addPostActionCreator("it-kamasutra.com");

    let newState = profileReducer(state, action)

    expect (newState.posts.length).toBe(4);
});


it("message of new post should be correct", () => {
    let action = addPostActionCreator("it-kamasutra.com");

    let newState = profileReducer(state, action)

    expect (newState.posts[3].message).toBe("it-kamasutra.com");
});


it("after deleting length of post should be decrement", () => {
    let action = deletePost(2);

    let newState = profileReducer(state, action)

    expect (newState.posts.length).toBe(2);
});