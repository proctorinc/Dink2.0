import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "~/utils/api";
import { formatToCurrency } from "~/utils";
import React from "react";

const Home: NextPage = () => {
  const users = api.users.getUsers.useQuery();
  const addMockUser = api.mockData.addMockUser.useMutation();
  const deleteUser = api.users.deleteUser.useMutation();
  const addMockBankAccount = api.mockData.addMockBankAccount.useMutation();
  const addMockFund = api.mockData.addMockFund.useMutation();
  const addMockBudget = api.mockData.addMockBudget.useMutation();
  const deleteBankAccount = api.bankAccounts.delete.useMutation();

  return (
    <>
      <div className="flex flex-col items-center gap-2">
        <h1>Users</h1>
        <button
          className="rounded-full bg-white/10 px-2 font-semibold text-white no-underline transition hover:bg-white/20"
          onClick={() => addMockUser.mutate()}
        >
          Generate user
        </button>
        {users?.data?.map((user) => (
          <div
            key={user.id}
            className="border-slate-500 border-collapse border text-left"
          >
            <div className="flex flex-col gap-2 p-5">
              <h1>
                {user.name}: {user.email}
              </h1>
              <div className="flex gap-2">
                <button
                  className="rounded-full bg-white/10 px-2 font-semibold text-white no-underline transition hover:bg-white/20"
                  onClick={() => deleteUser.mutate({ userId: user.id })}
                >
                  Delete
                </button>
                <button
                  className="rounded-full bg-white/10 px-2 font-semibold text-white no-underline transition hover:bg-white/20"
                  onClick={() => addMockBankAccount.mutate()}
                >
                  Add Bank
                </button>
                <button
                  className="rounded-full bg-white/10 px-2 font-semibold text-white no-underline transition hover:bg-white/20"
                  onClick={() => addMockFund.mutate({ userId: user.id })}
                >
                  Add Fund
                </button>
                <button
                  className="rounded-full bg-white/10 px-2 font-semibold text-white no-underline transition hover:bg-white/20"
                  onClick={() => addMockBudget.mutate({ userId: user.id })}
                >
                  Add Budget
                </button>
              </div>
            </div>
            <table className="border-slate-500 w-full table-fixed border-collapse border p-2">
              <thead>
                <tr>
                  <th className="border-slate-600 bg-slate-800 border p-2">
                    Account Name
                  </th>
                  <th className="border-slate-600 bg-slate-800 border p-2">
                    Current
                  </th>
                  <th className="border-slate-600 bg-slate-800 border p-2">
                    Type
                  </th>
                  <th className="border-slate-600 bg-slate-800 border p-2">
                    Subtype
                  </th>
                  <th className="border-slate-600 bg-slate-800 border p-2">
                    Actions
                  </th>
                </tr>
              </thead>
              {user.bankAccounts?.map((account) => (
                <React.Fragment key={account.id}>
                  <tbody>
                    <tr>
                      <td className="border-slate-700 border p-2">
                        {account.name}
                      </td>
                      <td className="border-slate-700 border p-2">
                        {formatToCurrency(account.current)}
                      </td>
                      <td className="border-slate-700 border p-2">
                        {account.type}
                      </td>
                      <td className="border-slate-700 border p-2">
                        {account.subtype}
                      </td>
                      <td className="border-slate-700 border p-2">
                        <button
                          className="rounded-full bg-white/10 px-2 font-semibold text-white no-underline transition hover:bg-white/20"
                          onClick={() =>
                            deleteBankAccount.mutate({
                              accountId: account.id,
                            })
                          }
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </React.Fragment>
              ))}
            </table>
            <table className="border-slate-500 w-full table-fixed border-collapse border p-2">
              <thead>
                <tr>
                  <th className="border-slate-600 bg-slate-800 border p-2">
                    Fund Name
                  </th>
                  <th className="border-slate-600 bg-slate-800 border p-2">
                    Amount
                  </th>
                  <th className="border-slate-600 bg-slate-800 border p-2">
                    Actions
                  </th>
                </tr>
              </thead>
              {user.funds?.map((fund) => (
                <React.Fragment key={fund.id}>
                  <tbody>
                    <tr>
                      <td className="border-slate-700 border p-2">
                        {fund.name}
                      </td>
                      <td className="border-slate-700 border p-2">
                        <button
                          className="rounded-full bg-white/10 px-2 font-semibold text-white no-underline transition hover:bg-white/20"
                          // onClick={() =>
                          //   deleteBankAccount.mutate({
                          //     accountId: account.id,
                          //   })
                          // }
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </React.Fragment>
              ))}
            </table>
            <table className="border-slate-500 w-full table-fixed border-collapse border p-2">
              <thead>
                <tr>
                  <th className="border-slate-600 bg-slate-800 border p-2">
                    Budget Name
                  </th>
                  <th className="border-slate-600 bg-slate-800 border p-2">
                    Goal
                  </th>
                  <th className="border-slate-600 bg-slate-800 border p-2">
                    Actions
                  </th>
                </tr>
              </thead>
              {user.budgets?.map((budget) => (
                <React.Fragment key={budget.id}>
                  <tbody>
                    <tr>
                      <td className="border-slate-700 border p-2">
                        {budget.name}
                      </td>
                      <td className="border-slate-700 border p-2">
                        {formatToCurrency(budget.goal)}
                      </td>
                      <td className="border-slate-700 border p-2">
                        <button
                          className="rounded-full bg-white/10 px-2 font-semibold text-white no-underline transition hover:bg-white/20"
                          // onClick={() =>
                          //   deleteBankAccount.mutate({
                          //     accountId: account.id,
                          //   })
                          // }
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </React.Fragment>
              ))}
            </table>
          </div>
        ))}
      </div>
      <AuthShowcase />
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <span className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
      </span>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};
