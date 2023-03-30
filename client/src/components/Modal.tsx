import { useNavigate } from 'react-router-dom';
import useKeyHandler from '../hooks/useKeyHandler';

interface IModalProps {
    children?: any;
}

const Modal = ({ children }: IModalProps) => {
    const navigate = useNavigate();

    //Hook to handle using the 'escape' key to close the modal
    useKeyHandler('keydown', 27, '', () => navigate('/'));

    //Styles for tailwind
    const styles = {
        wrapper:
            'justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none',
        content:
            'border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none',
    };

    return (
        <>
            (
            <>
                <div className={`${styles.wrapper}`}>
                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                        {/*content*/}
                        <div className={`${styles.content}`}>{children}</div>
                    </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
            )
        </>
    );
};

export default Modal;
