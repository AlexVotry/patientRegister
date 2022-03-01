import React from 'react';
import makeContext from '../service/contextHelper';

const User  = React.createContext({});

const context = makeContext(User, 'User');

const UserProvider = context.ContextProvider;

const useUser = context.UseContext;

// eslint-disable-next-line import/no-anonymous-default-export
export default { UserProvider, useUser };