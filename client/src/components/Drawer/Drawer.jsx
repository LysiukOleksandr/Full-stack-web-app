import React from 'react'

const Drawer = () => {

    const [visible, setVisible] = React.useState(false)

    const onClose = () => {
        setVisible(false)
    }

    return(
        <div className='drawer'>
            <Drawer
                title="Basic Drawer"
                placement='top'
                closable={false}
                onClose={onClose}
                visible={visible}
                key='top'
            >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Drawer>
        </div>
    )
}

export default Drawer