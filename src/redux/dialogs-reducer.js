const UPDATE_TEXT_MESSAGE_BODY = 'UPDATE-TEXT-MESSAGE-BODY';
const SEND_MESSAGE = 'SEND-MESSAGE';

let initialState = {
    dialogs: [
        {
            id: 1,
            name: "Dimych",
            avatar: "http://profnastil.berezniki159.ru/wp-content/uploads/2016/04/manager.png"
        },
        {
            id: 2,
            name: "Andrey",
            avatar: "http://profnastil.berezniki159.ru/wp-content/uploads/2016/04/manager.png"
        },
        {
            id: 3,
            name: "Martyn",
            avatar: "http://profnastil.berezniki159.ru/wp-content/uploads/2016/04/manager.png"
        },
        {
            id: 4,
            name: "Sasha",
            avatar: "https://iconfree.net/uploads/icon/2018/9/27/user-woman-girl-icon-8165-512x512.png"
        },
        {
            id: 5,
            name: "Sveta",
            avatar: "https://iconfree.net/uploads/icon/2018/9/27/user-woman-girl-icon-8165-512x512.png"
        },
        {
            id: 6,
            name: "Valera",
            avatar: "http://profnastil.berezniki159.ru/wp-content/uploads/2016/04/manager.png"
        }
    ],
    messages: [
        {id: 1, message: "Hi!"},
        {id: 2, message: "What are you doing?"},
        {id: 3, message: "Do you want your boat back?"},
    ],
    newMessageText: ''
};

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_MESSAGE: {
            return {
                ...state,
                messages: [...state.messages, {id: 6, message: action.message}],
            };
        }
        default:
            return state;
    }
};

export const addTextMessageCreator = (message) =>
    ({
        type: SEND_MESSAGE,
        message
    });

export const updateTextMessageBodyCreator = (body) =>
    ({
        type: UPDATE_TEXT_MESSAGE_BODY,
        body: body
    });

export default dialogsReducer;