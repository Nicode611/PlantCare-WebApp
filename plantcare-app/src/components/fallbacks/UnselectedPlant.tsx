import { Leaf } from 'lucide-react'

function UnselectedPlant() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full px-12 py-5 text-center">
      <h3 className="flex text-lg font-bold "><Leaf className="w-12 text-primary" />Select a plant</h3>
      <p className="text-secondary text-sm mt-2">Click on a plant from the list to view its details.</p>
    </div>
  )
}

export default UnselectedPlant
