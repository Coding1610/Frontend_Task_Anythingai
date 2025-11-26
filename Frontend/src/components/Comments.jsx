import React, { useState } from "react";
import { MessagesSquare } from "lucide-react";
import { FormControl, FormField, FormItem, FormMessage, Form } from '@/components/ui/form'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { getEnv } from "@/helpers/getEnv";
import { showToast } from "@/helpers/showToast";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { useSelector } from "react-redux";

export default function Comments() {

    const [nC,setNC] = useState();

    const user = useSelector((state) => state.user);

    const formSchema = z.object({
        comment: z.string().min(2,'Comment must be atleast 2 character long!'),     
    });

    const form = useForm({
        resolver:zodResolver(formSchema),
        defaultValues:{
            comment:"",
        }
    });

    // Backend
    async function onSubmit(values){
        try{
            const newValues = {...values, author:user?.user?._id};
            const response = await fetch(`${getEnv('VITE_API_BASE_URL')}/comment/add`,{
                method:'post',
                headers:{'Content-type':'application/json'},
                credentials: 'include',
                body:JSON.stringify(newValues)
            });
            const data = await response.json();
            if(!response.ok){
                return showToast('Error', data.message || 'Something went wrong, please try again later.');
            }
            setNC(data?.newComment);
            showToast('Success', 'Comment Added Successfully.');
            form.reset();
        } catch (error) {
            showToast('Error', error.message);
        }
    };   

    return (
        <>
        <div className="font-roboto">
            <h4 className="font-bold text-darkRed text-xl sm:text-2xl mb-3">
            Add Comments
            </h4>

            
            {user.user?.role === 'User' ? (
                <>
                    <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="mb-3">
                            <FormField
                            control={form.control}
                            name="comment"
                            render={({ field }) => (
                                <FormItem className="relative">
                                <FormControl>
                                    <div className="relative">
                                    <Textarea
                                        {...field}
                                        className="focus-visible:ring-darkRed focus:outline-none bg-gray-50 rounded-lg pr-10"
                                        placeholder="Type your comment..."
                                    />
                                    </div>
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                        </div>
                        <Button
                        type="submit"
                        className="bg-darkRed hover:bg-midRed rounded-lg w-max flex justify-center items-center gap-2 mt-5"
                        >
                        <MessagesSquare />
                        Add Comment
                        </Button>
                    </form>
                    </Form>
                </>
                ) : (
                <>
                </>
                )
            }
        </div>
        </>
    );
}