const UPDATE_TEXT_MESSAGE_BODY = 'UPDATE-TEXT-MESSAGE-BODY';
const SEND_MESSAGE = 'SEND-MESSAGE';

type InitialStateType = {
    dialogs: Array<DialogsItemType>
    messages: Array<MessagesItemType>
    newMessageText: string
}
type DialogsItemType = {
    id: number
    name: string
    avatarUrl: string
}
type MessagesItemType = {
    id: number
    message: string
}
let initialState = {
    dialogs: [
        {
            id: 1,
            name: "Dimych",
            avatarUrl: "http://profnastil.berezniki159.ru/wp-content/uploads/2016/04/manager.png"
        },
        {
            id: 2,
            name: "Andrey",
            avatarUrl: "http://profnastil.berezniki159.ru/wp-content/uploads/2016/04/manager.png"
        },
        {
            id: 3,
            name: "Martyn",
            avatarUrl: "http://profnastil.berezniki159.ru/wp-content/uploads/2016/04/manager.png"
        },
        {
            id: 4,
            name: "Sasha",
            avatarUrl: "https://iconfree.net/uploads/icon/2018/9/27/user-woman-girl-icon-8165-512x512.png"
        },
        {
            id: 5,
            name: "Sveta",
            avatarUrl: "https://iconfree.net/uploads/icon/2018/9/27/user-woman-girl-icon-8165-512x512.png"
        },
        {
            id: 6,
            name: "Valera",
            avatarUrl: "http://profnastil.berezniki159.ru/wp-content/uploads/2016/04/manager.png"
        }
    ],
    messages: [
        {id: 1, message: "Hi!"},
        {id: 2, message: "What are you doing?"},
        {id: 3, message: "Do you want your boat back?"},
    ],
    newMessageText: ''
};

const dialogsReducer = (state = initialState, action: any): InitialStateType => {
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

type AddTextMessageCreatorType = {
    type: typeof SEND_MESSAGE,
    message: string
}
export const addTextMessageCreator = (message: string): AddTextMessageCreatorType =>
    ({
        type: SEND_MESSAGE,
        message
    });


export default dialogsReducer;