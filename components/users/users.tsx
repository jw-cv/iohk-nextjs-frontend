import { columns } from "./columns"
import { DataTable } from "./data-table"

const data = [
  { name: "Jack", surname: "Front", number: "123", gender: "Male", country: "Latvia", dependants: 5, birthDate: "10/3/1981" },
  { name: "Jill", surname: "Human", number: "654", gender: "Female", country: "Spain", dependants: 0, birthDate: "6/2/1983" },
  { name: "Robert", surname: "Pullman", number: "456", gender: "Male", country: "German", dependants: 2, birthDate: "5/4/1999" },
  { name: "Chun Li", surname: "Suzuki", number: "987", gender: "Female", country: "China", dependants: 1, birthDate: "11/9/2001" },
  { name: "Sarah", surname: "Van Que", number: "587", gender: "Female", country: "Latvia", dependants: 4, birthDate: "6/22/1989" },
]

export function Users() {
  return (
    <div className="container mx-auto py-6">
      <DataTable columns={columns} data={data} />
    </div>
  )
}