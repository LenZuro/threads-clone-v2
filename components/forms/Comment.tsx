'use client'

import { z } from 'zod';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { usePathname } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form , FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

interface Props {
    threadId: string;
    currentUserImg: string;
    currentUserId: string;
}

const Comment = ({ threadId, currentUserImg , currentUserId } : Props) => {
    return (
        <div>
            <h1 className="text-white">Comment Form</h1>
        </div>
    )
}

export default Comment;