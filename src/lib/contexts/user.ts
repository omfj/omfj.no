import { getContext, setContext } from 'svelte';
import type { ValidatedSession } from '$lib/services/auth';

type User = Exclude<ValidatedSession['user'], null>;

export type UserContext = {
	current: User | null;
};

const AUTH_CONTEXT_KEY = Symbol('auth');

export function setUserContext(value: UserContext) {
	return setContext<UserContext>(AUTH_CONTEXT_KEY, value);
}

export function getUser() {
	return getContext<UserContext>(AUTH_CONTEXT_KEY);
}

export function getAuthenticatedUser() {
	const userContext = getUser();

	if (!userContext.current) {
		throw new Error('User context not found');
	}

	return userContext as { current: User }; // We know for sure that user is authenticated here
}
