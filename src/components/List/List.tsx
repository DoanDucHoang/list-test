import React from 'react'
import './List.style.css'
import { IBanner, convertFile } from '../../helper/Banner.type'

type Props = {
    listBanner: IBanner[];
    onDeleteBanner: (data: IBanner) => void
    onEditBanner: (data: IBanner) => void
};

const List = (props: Props) => {
    const { listBanner, onDeleteBanner, onEditBanner } = props;

  return (
      <div className='container-list'>
          <div className='list'>
              <table>
                  <tbody>
                <tr>
                    <th>Banner ID</th>
                    <th>Net Number</th>
                    <th>Banner Name</th>
                    <th>Link</th>
                    <th>Text</th>
                    <th>Date</th>
                    <th>Image</th>
                    <th>Edit</th>
                    <th>Delete</th>
                    </tr>
                      {/* { listBanner.length < 0 ? "" : "" } */}
                  {listBanner.map((item, index) => (
                      <tr key={index}>
                        <td width="50px" >{ index + 1}</td>
                        <td width="20px">{ item.order}</td>
                        <td width="200px">{ item.bannerName}</td>
                        <td width="200px">{ item.link}</td>
                        <td>
                            {item.text.map((data, index) => (
                                <p key={index}>
                                    {data.value}
                                </p>
                            ))}
                        </td>
                        <td width="90px">{ item.date.substring(0,10)}</td>
                          <td>
                            {item.image &&
                                <>
                                {(item.image.indexOf("image/") > -1) && 
                                <img src={item.image} width={200} />
                                }
                                </>
                            }
                        </td>
                        <td>
                            <button
                                  className='button-edit'
                                  onClick={()=>onEditBanner(item)}
                            >
                                Edit   
                            </button>
                        </td>
                        <td>
                            <button
                                className='button-delete'
                                onClick={ ()=> onDeleteBanner(item)}
                            >
                            Delete   
                            </button>
                        </td>
                    </tr>
                  ))}
                    </tbody>
              </table>
              {listBanner.length === 0 ? (
              <div className="not-found">
                    <h1>Banners Not Found!</h1>
                    <h4>Add your banners!</h4>
                </div>
              ) : ""}
              
            </div>
    </div>
  )
}

export default List