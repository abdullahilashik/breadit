import type {Session, User} from 'next-auth';
import type { JWT } from 'next-auth/jwt';

type userId = string;

declare module 'next-auth/jwt'{
    interface JWT {
        id: userId
        usernname?: string | null
    }


}
declare module 'next-auth'{
    interface Session {
        id: userId
        usernname?: string | null
    }

    
}