// import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { axiosInstance } from "../lib/axios"
import { Calendar, Clock, Users, ShoppingCart, CheckCircle } from "lucide-react"

export const useDashboardData = () => {
    const [loading, setLoading] = useState(true);
    const [events, setEvents] = useState([]);
    const [eventDistribution, setEventDistribution] = useState([]);
    const [stats, setStats] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const token = localStorage.getItem('token');

                await new Promise((resolve) => setTimeout(resolve, 3000));
                const [statsRes, eventRes, distRes] = await Promise.all([
                    axiosInstance.get('/dashboard/stats', { headers: { Authorization: `Bearer ${token}` } }),
                    axiosInstance.get('/dashboard/all-events', { headers: { Authorization: `Bearer ${token}` } }),
                    axiosInstance.get('/dashboard/events-distribution', { headers: { Authorization: `Bearer ${token}` } })
                ])
                setEvents(eventRes.data);
                setEventDistribution(distRes.data);

                setStats(
                    [
                        {
                            title: "Upcoming",
                            value: statsRes.data.totalEvents,
                            icon: Calendar,
                            iconColor: "text-blue-400",
                            bgColor: "bg-blue-400/10",
                        },
                        {
                            title: "Completed",
                            value: "0",
                            icon: CheckCircle,
                            iconColor: "text-green-400",
                            bgColor: "bg-green-400/10",
                        },
                        {
                            title: "Events",
                            value: statsRes.data.totalEvents,
                            icon: Clock,
                            iconColor: "text-yellow-400",
                            bgColor: "bg-yellow-400/10",
                        },
                        {
                            title: "Clients",
                            value: statsRes.data.totalClients,
                            icon: Users,
                            iconColor: "text-purple-400",
                            bgColor: "bg-purple-400/10",
                        },
                        {
                            title: "Vendors",
                            value: statsRes.data.totalVendors,
                            icon: ShoppingCart,
                            iconColor: "text-blue-400",
                            bgColor: "bg-blue-400/10",
                        },
                    ]
                )
                
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }
        fetchData();
    }, [])

    return { loading, events, stats, eventDistribution };
}