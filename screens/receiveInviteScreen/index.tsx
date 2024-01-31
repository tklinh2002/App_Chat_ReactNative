import { ScrollView, View } from "react-native"
import ObjectReceive from "./objectReceive"

const list = [
    {
        "id": 1,
        "name": "Người Dùng 1",
        "img": "avatar1.jpg",
        "date": "2024-01-31",
        "title": "abc"
    },
    {
        "id": 2,
        "name": "Người Dùng 2",
        "img": "avatar2.jpg",
        "date": "2024-01-31",
        "title": "abc"
    },
    {
        "id": 3,
        "name": "Người Dùng 2",
        "img": "avatar2.jpg",
        "date": "2024-01-31",
        "title": "abc"
    },
    {
        "id": 4,
        "name": "Người Dùng 2",
        "img": "avatar2.jpg",
        "date": "2024-01-31",
        "title": "abc"
    },
    {
        "id": 5,
        "name": "Người Dùng 2",
        "img": "avatar2.jpg",
        "date": "2024-01-31",
        "title": "abc"
    },
    {
        "id": 6,
        "name": "Người Dùng 2",
        "img": "avatar2.jpg",
        "date": "2024-01-31",
        "title": "abc"
    },
    {
        "id": 7,
        "name": "Người Dùng 2",
        "img": "avatar2.jpg",
        "date": "2024-01-31",
        "title": "abc"
    },
    {
        "id": 8,
        "name": "Người Dùng 2",
        "img": "avatar2.jpg",
        "date": "2024-01-31",
        "title": "abc"
    },
]
const ReceiveInvite = () => {
    return (
        <ScrollView style={{marginTop:10}}>
            {list.map((element) => (
                <ObjectReceive key={element.id} data={element} />
            ))}
        </ScrollView>
    )
}
export default ReceiveInvite