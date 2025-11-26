import React, { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { useFetch } from '@/hooks/useFtech'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { getEnv } from '@/helpers/getEnv'
import Loading from '@/components/Loading'
import { Trash, TriangleAlert } from 'lucide-react'
import { deleteData } from '@/helpers/handleDelete'
import { showToast } from '@/helpers/showToast'
import moment from 'moment'
import { useSelector } from 'react-redux'
import { RouteSignIn } from '@/helpers/RouteName'

// Dialog Components
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog"

import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"

export default function CommentsByMe() {

  const [refreshData, setRefreshData] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)
  const [selectedComment, setSelectedComment] = useState(null)
  const [confirmText, setConfirmText] = useState('')

  const [searchText, setSearchText] = useState("")
  const [sortOrder, setSortOrder] = useState("none")

  const user = useSelector((state) => state.user)

  const { data: commentData, loading } = useFetch(
    `${getEnv('VITE_API_BASE_URL')}/comments-by-me/${user?.user?._id}`,
    { method: 'get', credentials: 'include' },
    [refreshData]
  )

  const confirmDelete = async () => {
    const expected = `delete my comment : ${selectedComment?.comment}`

    if (confirmText !== expected) {
      showToast('Error', 'Text does not match. Please type the exact phrase.')
      return
    }

    const response = await deleteData(`${getEnv('VITE_API_BASE_URL')}/comment/delete/${selectedComment?._id}`)
    if (response) {
      showToast('Success', 'Comment Deleted Successfully')
      setRefreshData(!refreshData)
    } else {
      showToast('Error', 'Error while deleting comment')
    }

    setOpenDialog(false)
    setConfirmText('')
    setSelectedComment(null)
  }

  if (loading) return <Loading />

  const processedComments = commentData?.comments
    ?.filter((c) =>
      c.comment.toLowerCase().includes(searchText.toLowerCase())
    )
    ?.sort((a, b) => {
      if (sortOrder === "a-z") return a.comment.localeCompare(b.comment)
      if (sortOrder === "z-a") return b.comment.localeCompare(a.comment)
      return 0
    })

  if (user && user.isLoggedIn) {
    return (
      <>
        <Card className="w-full mx-14 px-4 pt-4 pb-2 space-y-3">

          <div className="flex justify-between items-center gap-4">

            <Input
              placeholder="Search your comments..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full bg-gray-50 rounded-lg outline-darkRed"
            />

            {/* Sort Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="bg-gray-100 text-black hover:bg-gray-200">
                  Sort
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="bg-white shadow-lg">
                <DropdownMenuItem onClick={() => setSortOrder("a-z")}>
                  A → Z
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortOrder("z-a")}>
                  Z → A
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortOrder("none")}>
                  Reset Sorting
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Table */}
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 text-nowrap text-[15px]">
                <TableHead>Comment</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {processedComments && processedComments.length > 0 ? (
                processedComments.map((c) => (
                  <TableRow key={c._id} className="text-nowrap">
                    <TableCell>{c.comment}</TableCell>
                    <TableCell>{moment(c.createdAt).format("DD-MM-YYYY")}</TableCell>

                    <TableCell className="flex gap-2 items-center">
                      <Button
                        onClick={() => {
                          setSelectedComment(c)
                          setOpenDialog(true)
                        }}
                        className="rounded-full px-2.5 bg-white shadow-none hover:bg-darkRed text-darkRed hover:text-white"
                      >
                        <Trash size={16} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4}>
                    <div className="cursor-not-allowed rounded-md p-2 shadow-md flex justify-center items-center text-red-600 gap-1 bg-gray-50 w-max mt-4">
                      <TriangleAlert size={20} />
                      <p className="font-medium">no comments found</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Card>

        {/* Delete Confirmation Dialog */}
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent className="sm:max-w-md font-roboto">
            <DialogHeader>
              <DialogTitle>Delete Comment</DialogTitle>
              <DialogDescription>
                To delete this comment, type:
                <span className="block mt-2 italic text-gray-800">
                  delete my comment : {selectedComment?.comment}
                </span>
              </DialogDescription>
            </DialogHeader>

            <Input
              className="font-medium h-10 rounded-lg bg-gray-50"
              placeholder="Type confirmation text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
            />

            <DialogFooter className="flex justify-end gap-2 pt-4">
              <DialogClose asChild>
                <Button
                  variant="outline"
                  onClick={() => {
                    setOpenDialog(false)
                    setConfirmText("")
                  }}
                >
                  Cancel
                </Button>
              </DialogClose>

              <Button
                className="bg-red-600 hover:bg-red-700 text-white"
                onClick={confirmDelete}
              >
                Confirm Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>
    )
  }

  return (
    <p className="flex text-[18px] justify-center text-red-600 font-medium items-center gap-2 text-wrap">
      <Link to={RouteSignIn} className="hover:border-b-2 border-red-600">
        sign-in
      </Link>{" "}
      to see comments made by you
    </p>
  )
}