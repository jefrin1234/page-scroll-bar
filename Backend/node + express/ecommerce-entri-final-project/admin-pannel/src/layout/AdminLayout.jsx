
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';
import axiosInstance from '../../../user-page/src/config/axiosInstance';
import { useDispatch } from 'react-redux';
import { setAdminNotifications } from '../slices/adminSlice';

function AdminLayout() {
  const dispatch = useDispatch();

  const fetchAdminNotifications = async () => {
    try {
      const response = await axiosInstance({
        method: 'GET',
        url: '/admin/admin-notifications',
      });

      console.log(response)

      const notifications = response.data.data || [];
      const readNotifications = notifications.filter(
        (notification) => notification.isRead
      );
      const unreadNotifications = notifications.filter(
        (notification) => !notification.isRead
      );

      // Directly dispatch notifications instead of relying on state
      dispatch(
        setAdminNotifications({
          readNotifications: readNotifications,
          unReadNotifications: unreadNotifications,
          notifications:notifications
        })
      );

      // console.log('Read Notifications:', readNotifications);
      // console.log('Unread Notifications:', unreadNotifications);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAdminNotifications();
  }, []);

  return (
    <div>
      <Header />
      <div className="min-h-[calc(100vh)] pt-16">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default AdminLayout;

