import React from 'react'
import {logOutUser} from "../../redux/actions/userActionsCreator";
import {Button, Modal} from "antd";
import {useDispatch} from "react-redux";
import {useHistory} from 'react-router-dom'

const Logout = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const [isModalVisible, setIsModalVisible] = React.useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    }

    const handleOk = () => {
        setIsModalVisible(false);
        dispatch(logOutUser())
        history.push('/login')

    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <div>
            <Button className='header__button' type="primary" onClick={showModal}>Logout</Button>
            <Modal
                title="Logout"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Back
                    </Button>,
                    <Button key="submit" type="primary" onClick={handleOk}>
                        Logout
                    </Button>,
                ]}
            >
                <p>Do you really want to leave?</p>
            </Modal>
        </div>
    )

}


export default Logout