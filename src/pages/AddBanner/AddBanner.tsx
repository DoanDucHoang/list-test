import React, { useState } from 'react'
import './AddBanner.style.css'
import { IBanner, IText, dummyTextList } from '../../helper/Banner.type';
import Validation from '../../helper/Validation';

type Props = {
  onCancelClick: () => void;
  onSubmitClick: (data: IBanner) => void;
}

const AddBanner = (props: Props) => {

  const { onCancelClick, onSubmitClick } = props;
  const [error, setError] = useState({
    group: "",
    name: "",
    link: "",
    order: "",
    text: "",
    image: "",
  });
  const [group, setGroup] = useState('');
  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const [order, setOrder] = useState(0);
  const [text, setText] = useState<IText[]>([
    {
      id: 0,
      value: ""
    }
  ]);
  const [image, setImage] = useState('');
  const [status, setStatus] = useState('');

  const addNewText = () => { 
    const data : IText = {
      id: text.length,
      value: "",
    }
    setText([...text, data])
  }

  const convertFile = (files: FileList | null) => { 
    if (files) { 
      const fileRef = files[0] || ""
      const sizeFile = Math.round((fileRef.size / 1024));
      if (sizeFile >= 2048) {
        setError({ ...error, image: "File too Big, please select a file less than 2mb" })
        return false
      } else if (fileRef.type !== "image/jpeg" && fileRef.type !== "image/png"  ) { 
        setError({ ...error, image: "Only Image File" })
        return false
      }
      const fileType: string = fileRef.type || ""
      const reader = new FileReader()
      reader.readAsBinaryString(fileRef)
      reader.onload=(ev: any) => {
        setImage(`data:${fileType};base64,${btoa(ev.target.result)}`)
      }
    }
  }

  const onGroupChange = (e: any) => { 
    setGroup(e.target.value)
  }

  const onNameChange = (e: any) => { 
    setName(e.target.value)
  }

  const onLinkChange = (e: any) => { 
    setLink(e.target.value)
  }

  const onOrderChange = (e: any) => { 
    setOrder(e.target.value)
  }

  const onTextChange = (e: any) => { 
    const { value, id } = e.target;
    const index = text.findIndex((item) => item.id == id)
    const duplicateText = [...text]

    duplicateText[index] = {
      id: text[index].id,
      value: value,
    }

    setText(duplicateText)
  }

  const onStatusChange = (e: any) => { 
    setStatus(e.target.value)
  }

  const onSubmit = (e: any) => { 
    e.preventDefault();
    const isError = Validation(group, name, link, order, text, image);
    if (Object.keys(isError).length === 0) {
      const data: IBanner = {
        id: new Date().toJSON().toString(),
        bannerGroup: group,
        bannerName: name,
        date: new Date().toJSON().toString(),
        link: link,
        order: order,
        text: text,
        image: image,
        status: status,
      }
      onSubmitClick(data);
      onCancelClick();
    } else { 
      setError(Validation(group, name, link, order, text, image));
    }
  }

  return (
    <div className='container'>
      <form onSubmit={onSubmit}>
        <div className='form-create'>

        <table className=''>
          <tbody>
            <tr>
              <th>Banner Group</th>
              <td>
                <select
                    name="group"
                    id="group"
                    defaultValue={'DEFAULT'}
                    onChange={onGroupChange}>
                  <option value="DEFAULT" disabled>Select a banner group</option>
                  <option value="main1">Main1</option>
                  <option value="main2">Main2</option>
                  <option value="main3">Main3</option>
                  <option value="main4">Main4</option>
                </select>
                {error && <small className="error-text"> { error.group}</small> }
              </td>
            </tr>

            <tr>
              <th>Banner Name</th>
              <td>
                  <input
                    type="text"
                    name='name'
                    id='name'
                    placeholder='add your name banner'
                    value={name}
                    onChange={onNameChange} />
                  {error && <small className="error-text"> { error.name}</small> }
              </td>
            </tr>

            <tr>
              <th>Link</th>
              <td>
                  <input
                    type="text"
                    name='link'
                    id='link'
                    placeholder='add your link banner'
                    value={link}
                    onChange={onLinkChange} />
                  {error && <small className="error-text"> { error.link}</small> }
              </td>
            </tr>

            <tr>
              <th>Order</th>
              <td>
                  <input
                    type="number"
                    name='order'
                    id='order'
                    placeholder='add your order'
                    value={order}
                    onChange={onOrderChange}/>
                  <span>*Higher numbers are printed first</span>
                  {error && <small className="error-text"> { error.order}</small> }
              </td>
            </tr>

              {text.map((item, index) => (
                <tr key={index}>
                  <th>Text { index + 1}</th>
                  <td>
                    <input
                      type="text"
                      name={`text${index}`}
                      id={`${index}`}
                      placeholder='add your text banner'
                      onChange={onTextChange} />
                    {error && <small className="error-text"> { error.text}</small> }
                  </td>
                </tr>
              ))}

            <tr>
              <th colSpan={2}>
                <input type="button" value="Add Text +" onClick={addNewText}/>
              </th>
            </tr>

            <tr>
              <th>Image</th>
              <td>
                  <input
                    type="file"
                    name='image'
                    id='image'
                    onChange={(e) => convertFile(e.target.files)} />
                  {error && <small className="error-text"> { error.image}</small> }
                  <br/>
                  {image &&
                    <>
                    {(image.indexOf("image/") > -1) && 
                    <img src={image} width={300} />
                    }
                    </>
                  }
              </td>
            </tr>

            <tr>
              <th>Status</th>
              <td>
                <input
                    type="radio"
                    id="exposure"
                    name="status"
                    value="Exposure"
                    checked={ true}
                    onChange={onStatusChange}/>
                <label htmlFor="html">Exposure</label>
                <input
                    type="radio"
                    id="pause"
                    name="status"
                    value="Pause"
                    onChange={onStatusChange}/>
                <label htmlFor="css">Pause</label>
              </td>
            </tr>

          </tbody>
        </table>
        </div>

        <div className='button-group'>
          <input type="button" value="cancel" className='cancel-btn' onClick={onCancelClick}/>
          <input type="submit" value="create" className='create-btn'/>
        </div>

        </form>
    </div>
  )
}

export default AddBanner