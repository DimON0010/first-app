type OnlineFriendsItem = {
  id: number
  name: string
  avatarUrl: string
}
type InitialStateType = {
  onlineFriends: Array<OnlineFriendsItem>
}
let initialState = {
  onlineFriends: [
    {
      id: 3,
      name: "Martyn",
      avatarUrl: "https://cdn2.vectorstock.com/i/1000x1000/25/31/user-icon-businessman-profile-man-avatar-vector-10552531.jpg"
    },
    {
      id: 4,
      name: "Sasha",
      avatarUrl: "https://banner2.cleanpng.com/20180319/rlq/kisspng-computer-icons-user-profile-avatar-profile-transparent-png-5ab03f3def8981.4074689915214999659812.jpg"
    },
    {
      id: 5,
      name: "Sveta",
      avatarUrl: "https://banner2.cleanpng.com/20180319/rlq/kisspng-computer-icons-user-profile-avatar-profile-transparent-png-5ab03f3def8981.4074689915214999659812.jpg"
    }]
};
const navbarReducer = (state = initialState, action: any): InitialStateType => {

  return state;
};

export default navbarReducer;