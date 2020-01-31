import React from 'react';
import cls from './../Dialogs.module.css'

const Message = (props) => {

    return (<div>
        <img className={cls.avatar}
                      src='https://banner2.cleanpng.com/20180325/kxe/kisspng-teacher-education-student-course-school-avatar-5ab752767ae3f6.7668647915219636385034.jpg'
             alt='avatar' />
        <div className={cls.message}>{props.message}</div>
    </div>
)
};

export default Message;