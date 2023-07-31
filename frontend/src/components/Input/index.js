import Styles from './Input.module.css'

function Input({ type, label, placeholder}){
    return(
        <div className=''>
        <label className='form-label'>{label}</label>
        <input 
        className='form-control' 
        type={type} 
        placeholder={placeholder} />
        </div>
    )
}

export default Input