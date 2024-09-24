"use client"

import React, { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts'

type User = {
  name: string
  surname: string
  number: string
  gender: string
  country: string
  dependants: number
  birthDate: string
}

const data: User[] = [
  { name: "Jack", surname: "Front", number: "123", gender: "Male", country: "Latvia", dependants: 5, birthDate: "10/3/1981" },
  { name: "Jill", surname: "Human", number: "654", gender: "Female", country: "Spain", dependants: 0, birthDate: "6/2/1983" },
  { name: "Robert", surname: "Pullman", number: "456", gender: "Male", country: "German", dependants: 2, birthDate: "5/4/1999" },
  { name: "Chun Li", surname: "Suzuki", number: "987", gender: "Female", country: "China", dependants: 1, birthDate: "11/9/2001" },
  { name: "Sarah", surname: "Van Que", number: "587", gender: "Female", country: "Latvia", dependants: 4, birthDate: "6/22/1989" },
]

const calculateAge = (birthDate: string) => {
  const today = new Date()
  const birthDateParts = birthDate.split('/')
  const birth = new Date(parseInt(birthDateParts[2]), parseInt(birthDateParts[0]) - 1, parseInt(birthDateParts[1]))
  let age = today.getFullYear() - birth.getFullYear()
  const monthDiff = today.getMonth() - birth.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--
  }
  return age
}

const getAgeGroup = (age: number) => {
  if (age < 20) return '0-19'
  if (age < 40) return '20-39'
  if (age < 60) return '40-59'
  return '60+'
}

export function UsersOverview() {
  const [selectedGender, setSelectedGender] = useState<string | undefined>()
  const [selectedDate, setSelectedDate] = useState<string | undefined>()

  const filteredData = useMemo(() => {
    return data.filter(user => 
      (!selectedGender || selectedGender === 'all' || user.gender === selectedGender) &&
      (!selectedDate || selectedDate === 'all' || user.birthDate === selectedDate)
    )
  }, [selectedGender, selectedDate])

  const dependantsByCountry = useMemo(() => {
    const countryData: { [key: string]: number } = {}
    filteredData.forEach(user => {
      countryData[user.country] = (countryData[user.country] || 0) + user.dependants
    })
    return Object.entries(countryData).map(([country, dependants]) => ({ country, dependants }))
  }, [filteredData])

  const ageGroups = useMemo(() => {
    const groups: { [key: string]: number } = {}
    filteredData.forEach(user => {
      const age = calculateAge(user.birthDate)
      const group = getAgeGroup(age)
      groups[group] = (groups[group] || 0) + 1
    })
    return Object.entries(groups).map(([group, count]) => ({ group, count }))
  }, [filteredData])

  const genderDistribution = useMemo(() => {
    const distribution: { [key: string]: number } = {}
    filteredData.forEach(user => {
      distribution[user.gender] = (distribution[user.gender] || 0) + 1
    })
    return Object.entries(distribution).map(([gender, count]) => ({ gender, count }))
  }, [filteredData])

  return (
    <div className="space-y-4">
      <div className="flex space-x-4">
        <Select onValueChange={setSelectedGender}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Genders</SelectItem>
            <SelectItem value="Male">Male</SelectItem>
            <SelectItem value="Female">Female</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={setSelectedDate}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Date" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Dates</SelectItem>
            {data.map(user => (
              <SelectItem key={user.birthDate} value={user.birthDate}>
                {user.birthDate}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Dependants by Country</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dependantsByCountry}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="country" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="dependants" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Age Group Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={ageGroups}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="group" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Gender Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={genderDistribution}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="gender" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="count" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}