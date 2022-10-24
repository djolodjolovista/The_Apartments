import React,{ useEffect} from 'react';
import { Tabs } from 'antd';
import './AdminScreen.css';
import BookingTab from './AdminscreenTabs/BookingTab';
import RoomTab from './AdminscreenTabs/RoomTab';
import AddRoomTab from './AdminscreenTabs/AddRoomTab';
import UsersTab from './AdminscreenTabs/UsersTab';

const { TabPane } = Tabs;

function Adminscreen() {
  useEffect(() => {
    
    if(!JSON.parse(localStorage.getItem('currentUser')!).isAdmin)
    {
      window.location.href="/home";
    }
  
    
  }, [])
  
  return (
    <div className='mt-3 ml-3 mr-3 bs'>
        <h2 className='text-center' style={{fontSize: '30px'}}><b>Admin Panel</b></h2>
        <Tabs defaultActiveKey="1">
    <TabPane tab="Rezervacije" key="1">
      <BookingTab/>
    </TabPane>
    <TabPane tab="Sobe" key="2">
      <RoomTab />
    </TabPane>
    <TabPane tab="Dodaj sobu" key="3">
      <AddRoomTab />
    </TabPane>
    <TabPane tab="Korisnici" key="4">
      <UsersTab />
    </TabPane>
  </Tabs>
    </div>
  )
}

export default Adminscreen;

//Bookings component (mogli smo i napraviti u folderu components pa importovati)

//Rooms component


//Users component


//Add Room component


