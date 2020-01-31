import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";
import navbarReducer from "./navbar-reducer";

let store = {
    _state: {
        profilePage: {
            posts: [{id: 1, message: 'Hello, how are you?', likesCount: 15},
                {id: 2, message: 'I am the dangerous, Skyler.', likesCount: 20},
                {id: 3, message: 'And if you save yourself...', likesCount: 11}
            ],
            newPostMessage: 'The Show Must Go On'
        },
        messagesPage: {
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
        },
        navbar: {
            onlineFriends: [
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
                }]
        }
    },
    _callSubscriber() {
        console.log('Sub is ...')
    },

    subscribe(observer) {
        this._callSubscriber = observer;
    },
    getState() {
        return this._state;
    },

    dispatch(action) {
        this._state.messagesPage = dialogsReducer(this._state.messagesPage, action);
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.navbar = navbarReducer(this._state.navbar, action);

        this._callSubscriber(this._state);

    }
};


export default store;