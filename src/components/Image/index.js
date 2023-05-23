import {useEffect, useState} from "react";


const Image = ({ imageName }) => {

    const [image, setImage] = useState(undefined)
    useEffect(() => {
        import(`../../images/${imageName}`).then(({default: imageObj}) => {
            setImage(imageObj)
        })
    }, [imageName])

    return image ? (
        <>
        <img className="img-thumbnail" src={image}/>
        </>
    ) : 'Loading....';
};

export default Image;