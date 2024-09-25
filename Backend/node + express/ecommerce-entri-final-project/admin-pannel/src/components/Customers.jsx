import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../config/axiosInstance'
import moment from 'moment';
import {  UserRoundPen } from 'lucide-react';
function Customers() {
  
  const [customers,setCustomers] = useState([])
  
 
  const fetchCustomers = async()=>{
    try {
      const response = await axiosInstance({
        method:'GET',
        url:'/admin/all-users',

      })
     
      setCustomers(response.data.data)
    } catch (error) {
      
    }
  }

  useEffect(()=>{
    fetchCustomers()
  },[])

  return (
    <div className='bg-white pb-4'>
      <table className='w-full userTable'>
        <thead>
          <tr className='bg-black text-white'>
            <th>Sr.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className='pb-4 bg-white'>
          {customers.map((customer, index) => (
            <tr key={customer._id}>
              <td>{index + 1}</td>
              <td>{customer.name}</td>
              <td>{customer.email}</td>
              <td>{customer.role.join(', ')}</td>
              <td>{moment(customer.createdAt).format('LL')}</td>
              <td>
                <button className='bg-green-100 p-2 rounded-full hover:bg-green-300 hover:text-white'>
                  <UserRoundPen
                    // onClick={() => {
                    //   setOpenUpdateRole(true);
                    //   setUpdateUserDetail(customer);
                    // }}
                  />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
  )
}

export default Customers
{

}