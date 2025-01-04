import React, { useEffect, useState } from 'react'
import List from '../../components/List/List'
import { IBanner, PageEnum } from '../../helper/Banner.type'
import './Home.style.css'
import AddBanner from '../AddBanner/AddBanner'
import EditBanner from '../EditBanner/EditBanner'

const Home = () => {
  const [banners, setBanners] = useState([] as IBanner[]);
  const [showPage, setShowPage] = useState(PageEnum.list)
  const [dataUpdate, setDataUpdate] = useState({} as IBanner);

  useEffect(() => { 
    const listBanner = window.localStorage.getItem("banners")

    if (listBanner) { 
      saveBannerList(JSON.parse(listBanner));
    }
  },[])

  const changePageAdd = () => { 
    setShowPage(PageEnum.add);
  }

  const showListPage = () => { 
    setShowPage(PageEnum.list);
  }

  const addBanner = (data: IBanner) => { 
    saveBannerList([...banners, data])
  }

  const deleteBanner = (data: IBanner) => { 
    const updateBanners = banners.filter(item => item.id !== data.id)
    setBanners(updateBanners);
    localStorage.setItem('banners', JSON.stringify(updateBanners));
  }

  const saveBannerList = (list: IBanner[]) => { 
    setBanners(list);
    window.localStorage.setItem("banners", JSON.stringify(list));
  }

  const editBanner = (data: IBanner) => { 
    setShowPage(PageEnum.edit);
    setDataUpdate(data)
  }

  const updateBanner = (data: IBanner) => { 
    const oldData = banners.filter(x => x.id === data.id)[0];
    const indexRecord = banners.indexOf(oldData);
    const tempData = [...banners]
    tempData[indexRecord] = data;
    saveBannerList(tempData);
  }

  return (
    <div className='container'>
      {showPage === PageEnum.list && (
        <>
          <div className='header-list'>
            <h2>List Banner</h2>
            <button
              onClick={changePageAdd}
              className='button-add'
            >
              Add
            </button>
          </div>
          <List listBanner={ banners} onDeleteBanner={deleteBanner} onEditBanner={editBanner}/>     
        </>
      )}

      {showPage === PageEnum.add && (
        <AddBanner onCancelClick={showListPage} onSubmitClick={addBanner}/>     
      )}

      {showPage === PageEnum.edit && (
        <EditBanner data={dataUpdate} onCancelClick={showListPage} onSubmitClick={updateBanner} />     
      )}
        
    </div>
  )
}

export default Home