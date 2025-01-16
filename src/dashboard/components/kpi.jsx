import React, { useState, useEffect } from 'react';
import { FaBed, FaPercentage, FaCheck, FaSignOutAlt } from 'react-icons/fa';
import rooms from '../../rooms/data/rooms.json';
import bookings from '../../booking/data/booking.json';
import { KpiContainer, Card, IconContainer, Number, Title, CardContent } from './kpi.js';
import { parse } from '@npmcli/package-json/lib/read-package.js';

export const Kpi = ({ startDate, endDate }) => {
    const [kpiData, setKpiData] = useState({
        totalBookings: 0,
        occupancyRate: 0,
        checkins: 0,
        checkouts: 0,
    });
    const parseDate = (dateString) => {
        const [day, month, year] = dateString.split('/')
        return `${month}/${day}/${year}`;
    };
    useEffect(() => {
        const start = new Date(parseDate(startDate));
        const end = endDate ? new Date(parseDate(endDate)) : new Date(startDate);
        const filteredBookings = bookings.filter((booking) => {
            const checkInDate = new Date(booking.check_in);
            const checkOutDate = new Date(booking.check_out);
            return (
                (checkInDate >= start && checkInDate <= end) ||
                (checkOutDate >= start && checkOutDate <= end)
            );
        });

        const totalBookings = filteredBookings.length;
        const totalRooms = rooms.length;
        const occupancyRate = totalRooms > 0 ? ((filteredBookings.length / totalRooms) * 100).toFixed(2) : 0;

        const checkins = filteredBookings.filter((booking) => {
            const checkInDate = new Date(booking.check_in);
            return checkInDate >= start && checkInDate <= end;
        }).length;

        const checkouts = filteredBookings.filter((booking) => {
            const checkOutDate = new Date(booking.check_out);
            return checkOutDate >= start && checkOutDate <= end;
        }).length;

        setKpiData({
            totalBookings,
            occupancyRate,
            checkins,
            checkouts,
        });
    }, [startDate, endDate, bookings, rooms]);


    return (
        <KpiContainer>
            <Card>
                <IconContainer>
                    <FaBed size={24} style={{ color: 'red' }} />
                </IconContainer>
                <CardContent>
                    <Number>{kpiData.totalBookings}</Number>
                    <Title>Reservas</Title>
                </CardContent>
            </Card>

            <Card>
                <IconContainer>
                    <FaPercentage size={24} style={{ color: 'red' }} />
                </IconContainer>
                <CardContent>
                    <Number>{kpiData.occupancyRate}%</Number>
                    <Title>Ocupación</Title>
                </CardContent>
            </Card>
            <Card>
                <IconContainer>
                    <FaCheck size={24} style={{ color: 'red' }} />
                </IconContainer>
                <CardContent>
                    <Number>{kpiData.checkins}</Number>
                    <Title>Check-ins</Title>
                </CardContent>
            </Card>
            <Card>
                <IconContainer>
                    <FaSignOutAlt size={24} style={{ color: 'red' }} />
                </IconContainer>
                <CardContent>
                    <Number>{kpiData.checkouts}</Number>
                    <Title>Check-outs</Title>
                </CardContent>
            </Card>
        </KpiContainer>
    );
};
