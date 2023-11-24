import { useState } from 'react';
import orderCoverImg from '../../../assets/shop/order.jpg'
import Cover from '../../Shared/Cover/Cover';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import useMenu from '../../../hooks/useMenu';
import OrderTab from '../OrderTab/OrderTab';

import { Helmet } from 'react-helmet-async';


const Order = () => {
  
  
    // let initialIndex = categories.indexOf(category);
    // console.log(initialIndex)
    const [tabIndex, setTabIndex] = useState(0);
    const [menu] = useMenu();
    

    
    const breakFast = menu?.filter(item => item.category === 'breakfast');
    const lunch = menu?.filter(item => item.category === 'lunch');
    const dinner = menu?.filter(item => item.category === 'dinner');



    

  // Access location.pathname to get the current path
 

    return (
        <div>
            <Helmet>
                <title>Bistro Boss | Order Food</title>
            </Helmet>
            <Cover img={orderCoverImg} title="Order Food"></Cover>
            <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                <TabList>
                    <Tab>All Meals</Tab>
                    <Tab>Break-Fast</Tab>
                    <Tab>Lunch</Tab>
                    <Tab>Dinner</Tab>
                   
                </TabList>
                <TabPanel>
                    <OrderTab items={menu}></OrderTab>
                </TabPanel>
                <TabPanel>
                    <OrderTab items={breakFast}></OrderTab>
                </TabPanel>
                <TabPanel>
                    <OrderTab items={lunch}></OrderTab>
                </TabPanel>
                <TabPanel>
                    <OrderTab items={dinner}></OrderTab>
                </TabPanel>
                
            </Tabs>
        </div>
    );
};

export default Order;