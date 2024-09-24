"use client"

import React, { useState, useMemo } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DependantsByCountryChart } from "@/components/users-overview/charts/dependants-by-country-chart"
import { AgeGroupDistributionChart } from "@/components/users-overview/charts/age-group-distribution-chart"
import { GenderDistributionChart } from "@/components/users-overview/charts/gender-distribution-chart"

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

const calculateAge = (birthDate: string): number => {
  const today = new Date()
  const [month, day, year] = birthDate.split('/').map(Number)
  const birth = new Date(year, month - 1, day)
  let age = today.getFullYear() - birth.getFullYear()
  const monthDiff = today.getMonth() - birth.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--
  }
  return age
}

const getAgeGroup = (age: number): string => {
  const groups = Array.from({ length: 20 }, (_, i) => `${i * 5}-${(i + 1) * 5 - 1}`)
  const index = Math.min(Math.floor(age / 5), 19)
  return groups[index]
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
    return Object.entries(countryData).map(([country, dependants]) => ({ 
      country, 
      dependants, 
      fill: `hsl(var(--chart-${Object.keys(countryData).indexOf(country) + 1}))`
    }))
  }, [filteredData])

  const ageGroupDistribution = useMemo(() => {
    const groups: { [key: string]: number } = {}
    filteredData.forEach(user => {
      const age = calculateAge(user.birthDate)
      const group = getAgeGroup(age)
      groups[group] = (groups[group] || 0) + 1
    })
    return Object.entries(groups).map(([ageGroup, count]) => ({ ageGroup, count }))
  }, [filteredData])

  const genderDistribution = useMemo(() => {
    const distribution: { [key: string]: number } = {}
    filteredData.forEach(user => {
      distribution[user.gender] = (distribution[user.gender] || 0) + 1
    })
    return Object.entries(distribution).map(([gender, count]) => ({ gender, count }))
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
        <GenderDistributionChart data={genderDistribution} />
      </div>
    </div>
  )
}