"use client"

import { useParams } from "react-router-dom"

export default function ProfilePage() {
    const { id } = useParams()

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-3xl font-bold mb-4">User Profile</h1>
            <div className="bg-gray-100 p-6 rounded-lg">
                <p className="text-lg">
                    <strong>User ID:</strong> {id}
                </p>
                <p className="text-gray-600 mt-4">Profile information will be displayed here.</p>
            </div>
        </div>
    )
}
