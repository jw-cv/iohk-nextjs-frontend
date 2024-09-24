"use client"

import React, { useState, useMemo } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DependantsByCountryChart } from '@/components/users-overview/charts/dependants-by-country-chart'
import { AgeGroupDistributionChart } from '@/components/users-overview/charts/age-group-distribution-chart'
import { DependantsByAgeChart } from '@/components/users-overview/charts/dependants-by-age-chart'
import { UsersByGenderChart } from '@/components/users-overview/charts/users-by-gender-chart'
import { AverageAgeByCountryChart } from '@/components/users-overview/charts/average-age-by-country-chart'

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
    return Object.entries(countryData).map(([country, dependants]) => ({ 
      country, 
      dependants, 
    }))
  }, [filteredData])

  const ageGroupDistribution = useMemo(() => {
    const groups: { [key: string]: number } = {}
    filteredData.forEach(user => {
      const age = new Date().getFullYear() - new Date(user.birthDate).getFullYear()
      const group = `${Math.floor(age / 5) * 5}-${Math.floor(age / 5) * 5 + 4}`
      groups[group] = (groups[group] || 0) + 1
    })
    return Object.entries(groups).map(([ageGroup, count]) => ({ ageGroup, count }))
  }, [filteredData])

  const dependantsByAge = useMemo(() => {
    return filteredData.map(user => ({
      birthDate: user.birthDate,
      dependants: user.dependants,
    }))
  }, [filteredData])

  const usersByGender = useMemo(() => {
    const genderData: { [key: string]: number } = {}
    filteredData.forEach(user => {
      genderData[user.gender] = (genderData[user.gender] || 0) + 1
    })
    return Object.entries(genderData).map(([gender, count]) => ({ gender, count }))
  }, [filteredData])

  const ageByCountry = useMemo(() => {
    const countryData: { [key: string]: { totalAge: number, count: number } } = {}
    filteredData.forEach(user => {
      const age = new Date().getFullYear() - new Date(user.birthDate).getFullYear()
      if (!countryData[user.country]) {
        countryData[user.country] = { totalAge: 0, count: 0 }
      }
      countryData[user.country].totalAge += age
      countryData[user.country].count++
    })
    return Object.entries(countryData).map(([country, data]) => ({ 
      country, 
      averageAge: data.count > 0 ? data.totalAge / data.count : 0,
    }))
  }, [filteredData])

  return (
    <div className="space-y-6 py-6">
      <div className="pt-4 flex space-x-4">
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DependantsByCountryChart data={dependantsByCountry} />
        <AgeGroupDistributionChart data={ageGroupDistribution} />
        <DependantsByAgeChart data={dependantsByAge} />
        <UsersByGenderChart data={usersByGender} />
        <AverageAgeByCountryChart data={ageByCountry} />
      </div>
    </div>
  )
}