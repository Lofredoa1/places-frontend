import React, {useState} from "react"

const Form = (props) => {
    const [formData, setFromData] = useState(props.place)
console.log(props.place)
    const handleSubmit = (event) => {
        event.preventDefault()
        props.handleSubmit(formData)
        props.history.push("/")
    };

    const handleChange = (event) => {
        setFromData({...formData, [event.target.name]: event.target.value})
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="name"
                placeholder="Enter Place Name"
                value={formData.name}
                onChange={handleChange}
            />
            <input
                type="text"
                name="img"
                placeholder="Enter IMG URL"
                value={formData.img}
                onChange={handleChange}
            />
            <input
                type="text"
                name="description"
                placeholder="Enter description"
                value={formData.description}
                onChange={handleChange}
            />
            <input type="submit" value={props.label}/>
        </form>
    );
};

export default Form